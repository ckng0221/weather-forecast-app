package main

import (
	"log/slog"
	"os"
	"timer/utils"

	"github.com/robfig/cron/v3"
)

func init() {
	requiredEnv := []string{"API_BASE_URL", "WEATHER_FORECAST_URL"}
	utils.LoadEnv(requiredEnv)
}

func main() {
	job := &Job{}

	if os.Getenv("DEBUG") == "1" {
		slog.SetLogLoggerLevel(slog.LevelDebug)
	}

	c := cron.New(cron.WithSeconds())
	cronExpression := os.Getenv("TIMER_SCHEDULE")
	c.AddFunc(cronExpression, job.main)

	// c.AddFunc("*/10 * * * * *", job.main)
	c.Start()
	slog.Info("Started cron job...")
	slog.Info("", "cron", cronExpression)

	select {}
}

// CompileDaemon -command="./timer"
