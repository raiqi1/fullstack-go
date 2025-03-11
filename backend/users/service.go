package users

import (
	"errors"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
)

type Service interface {
	Register(input RegisterInput) (User, error)
	Login(input LoginInput) (string, User, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo}
}

func (s *service) Register(input RegisterInput) (User, error) {
	existingUser, err := s.repo.FindByEmail(input.Email)
	if err == nil && existingUser.ID != 0 {
		return User{}, errors.New("email sudah digunakan")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return User{}, err
	}

	user := User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	return s.repo.Create(user)
}

func (s *service) Login(input LoginInput) (string, User, error) {
	user, err := s.repo.FindByEmail(input.Email)
	if err != nil {
		return "", User{}, errors.New("email atau password salah")
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password))
	if err != nil {
		return "", User{}, errors.New("email atau password salah")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return "", User{}, errors.New("JWT_SECRET tidak ditemukan")
	}

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", User{}, err
	}

	return tokenString, user, nil
}
