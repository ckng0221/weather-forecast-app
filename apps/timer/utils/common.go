package utils

import (
	"log"
	"os"

	"log/slog"

	"github.com/joho/godotenv"
)

func LoadEnv(requiredEnv []string) {
	err := godotenv.Load()
	if err != nil {
		slog.Warn("failed to load .env file")
	}
	for _, envName := range requiredEnv {
		env := os.Getenv(envName)
		if env == "" {
			log.Fatalf("environment variable '%s' is required", envName)
		}
	}
}
