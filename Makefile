.PHONY: test build

prepare:
	pnpm i

lint:
	pnpm run lint

dev:
	pnpm run dev

build:
	pnpm run generate