# Run
run_server:
	cd apps/api && \
	npm run start:dev

run_ui:
	cd apps/ui && \
	npm run start

run_timer:
	cd apps/timer && \
	go run .

# Installation
install_api:
	cd apps/api && \
	npm install

install_ui:
	cd apps/api && \
	npm install

install_all: install_api install_ui
