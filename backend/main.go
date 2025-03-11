package main

import (
	"os"
	"test-fullstack-go/config"
	"test-fullstack-go/handlers"
	"test-fullstack-go/users"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

func main() {
	logrus.SetFormatter(&logrus.JSONFormatter{})
	logrus.SetOutput(os.Stdout)
	logrus.SetLevel(logrus.InfoLevel)

	err := godotenv.Load()
	if err != nil {
		logrus.Warn("⚠️ Tidak menemukan file .env, pakai environment sistem")
	} else {
		logrus.Info("✅ .env berhasil dimuat")
	}

	config.InitDB()

	repo := users.NewRepository(config.DB)
	service := users.NewService(repo)
	handler := handlers.NewUserHandler(service)

	router := gin.Default()

	// Tambahkan middleware CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // Izinkan origin frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60,
	}))

	router.POST("/api/register", handler.Register)
	router.POST("/api/login", handler.Login)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		logrus.Warn("⚠️ PORT tidak ditemukan di .env, menggunakan default 8080")
	}

	// Start server
	logrus.Infof("✅ Server jalan di http://localhost:%s", port)
	err = router.Run(":" + port)
	if err != nil {
		logrus.Fatalf("❌ Gagal menjalankan server: %v", err)
	}
}
