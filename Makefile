.PHONY: docker-build docker-push docker-run-create-artifact create-artifact

PROJECT=cmvp-framework
IMAGE=docker.apiumtech.io/$(PROJECT)
TEMP_CONTAINER=$(PROJECT)-deleteme

clean:
	@npm prune --production
	rm -f artifact.tgz

docker-build:
	@docker build -t $(IMAGE) .

docker-push:
	@docker push $(IMAGE)

docker-run-create-artifact:
	docker rm "$(TEMP_CONTAINER)" || true
	docker run --name "$(TEMP_CONTAINER)" -v $(shell pwd)/:/tmp/ $(IMAGE) make create-artifact
	docker rm "$(TEMP_CONTAINER)"

create-artifact:
	@make clean
	tar -czf /tmp/artifact.tgz * .git
