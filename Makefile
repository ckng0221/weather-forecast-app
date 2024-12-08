# Run
run_api:
	cd apps/api && \
	npm run start:dev

run_ui:
	cd apps/ui && \
	npm run start

run_timer:
	cd apps/timer && \
	go run .

# Run Dev Server
# make -j2 run_dev
run_dev: run_api run_ui

# Installation
install_all: install_api install_ui install_timer

install_api:
	cd apps/api && \
	npm install

install_ui:
	cd apps/ui && \
	npm install

install_timer:
	cd apps/timer && \
	go mod download


# Test
test_all: test_api

test_api:
	cd apps/api && \
	npm run test

# Build
build_all: build_api build_ui build_timer
build_api:
	cd apps/api && \
	npm run build

build_ui:
	cd apps/ui && \
	npm run build

build_timer:
	cd apps/timer && \
	go build .