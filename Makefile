dev_run:
	@npm run dev

dev_install:
	@npm i

make_migration:
	@npx prisma migrate dev --name init

make_migration_generate:
	@npx prisma generate

load_fixtures:
	@npm run load_fixtures
