package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
)

type Forecast struct {
	Location          Location `json:"location"`
	Date              string   `json:"date"`
	MorningForecast   string   `json:"morning_forecast"`
	AfternoonForecast string   `json:"afternoon_forecast"`
	NightForeacast    string   `json:"night_forecast"`
	SummaryForecast   string   `json:"summary_forecast"`
	SummaryWhen       string   `json:"summary_when"`
	MinTemp           int      `json:"min_temp"`
	MaxTemp           int      `json:"max_temp"`
}

type Location struct {
	LocationID   string `json:"location_id"`
	LocationName string `json:"location_name"`
}

type Job struct {
	data []Forecast
}

func (j *Job) main() {
	err := j.retriveData()
	if err != nil {
		slog.Error("Failed to retrive data.", "error", err)
		return
	}

	err = j.updateData()
	if err != nil {
		slog.Error("Failed to update data.", "err", err)
		return
	}
	slog.Info("Completed job.")
	fmt.Println("-------------------------------")
}

func (j *Job) retriveData() error {
	apiEndpoint := os.Getenv("WEATHER_FORECAST_URL")
	message := fmt.Sprintf("Retriving data from %s...", apiEndpoint)
	slog.Info(message)

	resp, err := http.Get(apiEndpoint)
	if err != nil {
		slog.Error("Failed GET request", "err", err)
		return err
	}

	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		slog.Error("Request error", "status code", resp.StatusCode)

		return fmt.Errorf("request error. Status Code: %v", resp.StatusCode)
	}
	body, err := io.ReadAll(resp.Body)

	// fmt.Println(string(body))
	if err != nil {
		slog.Error("Failed to read request body", "err", err)
		return err
	}

	var forecast []Forecast
	err = json.Unmarshal(body, &forecast)
	if err != nil {
		slog.Error("Failed to unmarshal request body", "err", err)
		return err
	}

	// fmt.Println(forecast)
	j.data = forecast

	slog.Info("Retrived data.")
	return nil
}

func (j *Job) updateData() error {
	slog.Info("Updating data to database...")

	baseUrl := os.Getenv("API_BASE_URL")
	endpoint := fmt.Sprintf("%s/api/weathers", baseUrl)

	for _, forecast := range j.data {
		identifier := fmt.Sprintf("%s_%s", forecast.Date, forecast.Location.LocationID)
		forecast_data, err := json.Marshal(forecast)
		if err != nil {
			slog.Error("Failed to marshal request body", "err", err)
			return err
		}

		req, err := http.NewRequest(http.MethodPut, endpoint, bytes.NewBuffer(forecast_data))
		if err != nil {
			slog.Error("Failed to send request", "err", err)
			return err
		}
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			slog.Error("Failed to send request", "err", err)
			return err
		}
		defer resp.Body.Close()

		slog.Debug(fmt.Sprintf("Updated data for %s\n", identifier))
	}

	slog.Info("Updated all data.")
	return nil
}
