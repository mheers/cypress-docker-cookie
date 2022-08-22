ARG go="golang:1.19-alpine3.16"
ARG baseImage="alpine:3.16"

FROM ${go} as build

WORKDIR /src/
COPY . /src/

RUN go build -ldflags "-X main.Production=true" -o /bin/main

FROM ${baseImage}
COPY --from=build /bin/main /bin/main
ENTRYPOINT ["/bin/main"]

EXPOSE 8090