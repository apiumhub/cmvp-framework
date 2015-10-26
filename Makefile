.PHONY: docker-build docker-push docker-run-create-artifact create-artifact

PROJECT=cmvp-framework
IMAGE=docker.apiumtech.io/$(PROJECT)
TEMP_CONTAINER=$(PROJECT)-deleteme

clean:
	@npm prune --production
	rm -f artifact.tgz

docker-image:
	@docker build -t $(IMAGE) .

docker-build:
	@docker build -t $(IMAGE) .

docker-run-create-artifact:
	docker run --rm -v $(shell pwd)/:/tmp/ $(IMAGE) make create-artifact

create-artifact:
	@make clean
	tar -czf /tmp/artifact.tgz * .git
