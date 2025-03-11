package migration

import (
	"log"
	"test-fullstack-go/users"

	"gorm.io/gorm"
)

func MigrateUser(db *gorm.DB) {
	if err := db.AutoMigrate(&users.User{}); err != nil {
		log.Fatalf("❌ Gagal melakukan migrasi tabel Kontak: %v", err)
	} else {
		log.Println("✅ Migrasi tabel kontak berhasil!")
	}
}
