# Vercel Deployment Storage対策としての画像軽量化

## 目的

VercelのDeployment Storage使用量が増加していたため、Webサイトで使用している画像を軽量化する。

PC・スマートフォンでの表示品質を大きく損なわない範囲で画像サイズを削減し、今後のDeployment Storage使用量を抑える。

## 実装方針

以下の設定でJPEG画像を一括圧縮する。

- 最大辺：2400px
- JPEG品質：85
- mozjpeg：有効
- EXIFのOrientationを考慮して画像の向きを補正

元画像を直接削除・置換する方法では、Windows上で画像ファイルのロックによる`EPERM` / `EBUSY`エラーが発生したため、圧縮後の画像を一旦別フォルダに出力する方式に変更する。

## 今回やったこと

### Vercel Deployment Storageの確認

- VercelからDeployment Storageの無料枠を100%使用したという通知を確認
- 過去のDeploymentが蓄積していることを確認
- `public/logs`内の画像・動画が各DeploymentのStatic Assetsとして含まれていることを確認
- 複数のDeploymentを削除することでDeployment Storage使用量が大きく減少することを確認

### 画像圧縮のテスト

- 画像1枚で圧縮を試し、表示品質を確認
- 5712×4284px、約7.29MBの画像を2400×1800px、約1.25MBまで圧縮
- PC・スマートフォンでの表示に問題がないことを確認

### 一括圧縮

- `public/logs`内のJPEG画像309枚を対象に一括圧縮
- 元画像を直接削除して置換する方式では、一部の画像でWindowsのファイルロックによる`EBUSY` / `EPERM`エラーが発生
- 圧縮処理自体は正常に動作していたため、圧縮後の画像を`public/logs-compressed`へ出力する方式に変更
- 元画像を保持したまま309枚すべての圧縮に成功
- Google Drive経由などでEXIFのOrientationによる画像の向きが変わるケースがあったため、`sharp`の`.rotate()`を使用して向きを補正

### 圧縮結果

- 変換前：約1.013GB
- 変換後：約0.168GB
- 削減量：約0.845GB
- 削減率：約83.4%
- 対象：309枚
- スキップ：0枚

画像容量を約1GBから約176MBまで削減できた。

## 現在の状態

309枚のJPEG画像の圧縮処理が完了。

圧縮後の画像は`public/logs-compressed`に出力されており、元画像は保持している。

画像圧縮によって、今後のVercel Deployment Storage使用量を大幅に抑えられる状態になった。

## 今回わかったこと

- VercelのDeployment Storageは、現在のサイト容量だけでなく過去のDeploymentの蓄積も影響する
- `public`内の画像・動画はDeploymentのStatic Assetsとして扱われる
- Gitで管理していること自体が直接の原因ではなく、Deploymentにメディアが含まれることが容量増加につながる
- 画像をWeb向けのサイズ・品質に調整するだけでも大幅な容量削減が可能
- Windowsでは画像ファイルが何らかのプロセスにロックされていると、削除・置換時に`EBUSY` / `EPERM`が発生する場合がある
- 元画像を削除せず、別フォルダへ圧縮後の画像を出力する方式なら安全に一括処理できる
- EXIFのOrientationを考慮せずに画像を変換すると、画像の向きが変わる場合がある

## 次にやること

現在は画像圧縮によってDeployment Storageへの負荷を大きく削減できたため、外部ストレージへの移行は急がず様子を見る。

今後、画像・動画が増えてDeployment Storageの使用量が再び増加する場合は、Cloudflare R2などの外部オブジェクトストレージへメディアを移行する。

外部ストレージへの移行は、容量対策だけでなく、オブジェクトストレージ、公開URL、CORS、API、Next.jsとの連携などを学ぶ機会として、時間があるときに別途試す。
