run_server:
	cd api && \
	npm run start:dev

run_ui:
	cd ui && \
	npm run start

run_timer:
	cd timer && \
	go run .