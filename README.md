# madoka's Portfolio
エンジニアとしての第一歩を踏み出すため、日々学習に励んでおります。本ポートフォリオサイトでは、これまでに習得した技術や、フレームワークを用いた制作物を公開しています。制作を通して得た知識や、今後の成長への意欲を感じていただければ幸いです。


https://github.com/user-attachments/assets/fb82f00f-2e07-4fd1-9937-460204420d8e




## 使用技術

- Next.js : 15.2.1
- Typescript : 5
- Tailwind CSS : 3.4.1
- Express.js : 4.17.3
- Prisma : 6.5.0
- PostgreSQL : 15
- Docker : 27.5.1
- firebase : 11.4.0

## 機能

- レスポンシブ対応
- コンタクトフォーム（メールの送信）
- Management画面を通じて以下の情報の更新・管理が可能。

**1. 画像の更新**<br>
サイトに掲載するプロフィール画像をManagement画面から簡単にアップロード・変更することができます。

概要: Management画面上の直感的な操作により、画像ファイルをアップロードするだけで、サイトに表示される画像を最新の状態に保てます。
利用シーン: プロフィール写真を更新したい場合や、新しい作品を追加・差し替えたい場合に、迅速かつ容易に反映できます。

**2. GitHub URLの更新**<br>
概要: Management画面のフォームに新しいURLを入力し保存するだけで、サイト上のGitHub関連のリンクが更新されます。
利用シーン: GitHubアカウント名を変更した場合や、プロジェクトのリポジトリを移動・変更した場合でも、サイトのリンク切れを心配することなく最新の情報を維持できます。

**3. スキル (Skill) の更新**<br>
自身のスキルセットや得意な技術を、Management画面から追加、編集、削除することができます。
概要: Management画面上で、習得しているプログラミング言語、フレームワーク、ツールなどを管理できます。各スキルの熟練度合いなども調整可能です。
利用シーン: 新しいスキルを習得した場合や、特にアピールしたいスキルを強調したい場合に、ポートフォリオの内容を常に最新かつ最適な状態に保てます。


## ディレクトリ構成

```
portfolio/
├── backend/
│   ├── src/
│   │   ├── context/
│   |   |   ├── how_to_write.txt
│   |   |   └── logger.ts
│   │   ├── routers/
│   |   |   ├── index.ts
│   |   |   ├── portfolios.ts
│   |   |   ├── skill-details.ts
│   |   |   ├── skills.ts
|   |   |   └── works.ts
│   │   ├── typees/
│   |   |   ├── portfolio.ts
│   |   |   ├── skilldetail.ts
│   |   |   ├── skill.ts
|   |   |   └── works.ts
│   │   └── app.ts
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src
|   |   ├── app/
│   │   |   ├── components/
│   │   |   |   ├── sections/
|   │   │   |   |   ├── Hero.tsx
|   │   │   |   |   ├── SkillBox.tsx
|   │   │   |   |   ├── Skills.tsx
|   │   │   |   |   └── Works.tsx
│   │   |   |   ├── ContactForm.tsx
│   │   |   |   ├── Footer.tsx
│   │   |   |   ├── Header.tsx
│   │   |   |   ├── Main.tsx
│   │   |   |   ├── ScrolButton.tsx
│   │   |   |   └── Sidebar.tsx
│   │   |   ├── Edit/
│   │   |   ├── Login/
│   │   |   ├── page.tsx
│   │   |   ├── globals.css
│   │   |   └── layout.tsx
|   |   ├── hooks/
│   │   |   ├── GetWindowSize.ts
│   │   |   └── HowToUse.txt
|   |   ├── api.ts
|   |   ├── emailjs.d.ts
|   |   ├── firebase.ts
|   |   └── types.ts
│   ├── .gitignore
│   ├── .env
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── README.md
```
## 今後の課題
- アイコンを追加できるようにしたい
- 作品をサムネイル表示できるようにしたい
