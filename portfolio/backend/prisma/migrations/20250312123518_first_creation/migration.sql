-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image" TEXT,
    "introduction" TEXT,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "url" TEXT,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "portfolio_id" INTEGER NOT NULL,
    "category" TEXT,
    "explanation" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillDetail" (
    "id" SERIAL NOT NULL,
    "skill_id" INTEGER NOT NULL,
    "lang" TEXT,
    "star" INTEGER,

    CONSTRAINT "SkillDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillDetail" ADD CONSTRAINT "SkillDetail_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
