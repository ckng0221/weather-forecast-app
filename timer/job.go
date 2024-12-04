package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
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
		log.Println("Failed to retrive data.", err)
		return
	}

	err = j.updateData()
	if err != nil {
		log.Println("Failed to update data.", err)
		return
	}
	log.Println("Completed job.")
	fmt.Println("-------------------------------")
}

func (j *Job) retriveData() error {
	log.Println("Retriving data...")

	apiEndpoint := os.Getenv("WEATHER_FORECAST_URL")
	resp, err := http.Get(apiEndpoint)
	if err != nil {
		log.Println("Error: ", err)
		return err
	}

	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	// fmt.Println(string(body))
	if err != nil {
		log.Println("Failed to read request body: ", err)
		return err
	}

	var forecast []Forecast
	err = json.Unmarshal(body, &forecast)
	if err != nil {
		log.Println("Failed to unmarshal request body: ", err)
		return err
	}

	// fmt.Println(forecast)
	j.data = forecast

	log.Println("Retrived data.")
	return nil
}

func (j *Job) updateData() error {
	log.Println("Updating data to database...")

	baseUrl := os.Getenv("API_BASE_URL")
	endpoint := fmt.Sprintf("%s/api/weathers", baseUrl)

	for _, forecast := range j.data {
		identifier := fmt.Sprintf("%s_%s", forecast.Date, forecast.Location.LocationID)
		forecast_data, err := json.Marshal(forecast)
		if err != nil {
			log.Println("Failed to marshal request body: ", err)
			return err
		}

		req, err := http.NewRequest(http.MethodPut, endpoint, bytes.NewBuffer(forecast_data))
		if err != nil {
			log.Println("Failed to send request", err)
			return err
		}
		req.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			log.Println("Failed to send request", err)
			return err
		}
		defer resp.Body.Close()

		log.Printf("Updated data for %s\n", identifier)
	}

	log.Println("Updated all data.")
	return nil
}
