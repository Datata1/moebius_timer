.PHONY: test build

prepare:
	pnpm i

dev:
	pnpm run dev

build:
	pnpm run generate