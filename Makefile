lint: 
	cd frontend && npm run lint

lint-fix: 
	cd frontend && npm run lint -- --fix

prettier: 
	cd frontend && npx prettier --write .

lint-prettier: lint lint-fix prettier

start:
	./start.ps1

clear:
	docker compose down -v
	docker volume prune -f
	docker network prune -f