package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv(requiredEnv []string) {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("failed to load .env file")
	}
	for _, envName := range requiredEnv {
		env := os.Getenv(envName)
		if env == "" {
			log.Fatalf("environment variable '%s' is required", envName)
		}
	}
}
