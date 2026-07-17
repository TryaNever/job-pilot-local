lint: 
	cd frontend && npm run lint

lint-fix: 
	cd frontend && npm run lint -- --fix

prettier: 
	cd frontend && npx prettier --write .

lint-prettier: lint lint-fix prettier

dev-start:
	docker-compose up -d --build

clear:
	docker compose down -v
	docker system prune -f
	docker volume prune -f
	docker network prune -f