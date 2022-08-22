package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"net/http"
	"time"

	assets "github.com/mheers/cypress-cookies-docker/web"
)

// build flags
var (
	Production string // infered from build flags
)

var (
	development bool
)

func main() {
	development = false
	if Production != "true" {
		flag.BoolVar(&development, "dev", false, "development mode")
		flag.Parse()
	}

	var dev = development
	startWebServer(dev)
}

// start web server
func startWebServer(development bool) {
	fmt.Print("Starting web server in mode ")
	if development {
		fmt.Println("development")
	} else {
		fmt.Println("production")
	}

	mutex := http.NewServeMux()

	if development {
		mutex.Handle("/", http.FileServer(http.Dir("web")))
	} else {
		mutex.Handle("/", http.FileServer(http.FS(assets.Files)))
	}
	mutex.HandleFunc("/api/test", handleApiTest)

	err := http.ListenAndServe(":8090", mutex)
	if err != nil {
		panic(err)
	}
}

func handleApiTest(w http.ResponseWriter, r *http.Request) {
	// print all cookies of the request
	fmt.Println("Cookies:")
	for _, cookie := range r.Cookies() {
		fmt.Println("cookie:", cookie.Name, cookie.Value)
	}

	fmt.Println("Headers:")
	// dump request data
	fmt.Printf("%+v\n", r)

	type response struct {
		Millis  int64          `json:"millis"`
		Cookies []*http.Cookie `json:"cookies"`
	}

	// send response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response{Millis: getCurrentTimeMillis(), Cookies: r.Cookies()})
}

func getCurrentTimeMillis() int64 {
	return (int64(time.Now().UnixNano()) / int64(time.Millisecond))
}
