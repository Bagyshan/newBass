FROM python:3.10

ENV PYTHONIOENCODING UTF-8

# Создаем каталог для статических файлов
RUN mkdir -p /usr/src/app/api/static

WORKDIR /usr/src/app/

COPY api/static/ /usr/src/app/api/static/
RUN ls -R /usr/src/app/api/static/

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]