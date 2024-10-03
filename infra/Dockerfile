# Используйте официальный образ Python
FROM python:3.12-slim

# Установите рабочую директорию
WORKDIR /app

# Скопируйте wait-for-it.sh в контейнер
COPY infra/wait-for-it.sh /app/

# Скопируйте зависимости в контейнер
COPY ../backend/requirements.txt .

# Установите зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Скопируйте весь проект в контейнер
COPY ../backend/ .

# Откройте порт 8000
EXPOSE 8000

# Запустите сервер Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
