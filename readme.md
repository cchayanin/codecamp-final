# Course Registration

Personal Project สำหรับการเรียน CodeCamp#5.

## Getting Started

1. Clone Project

```
git clone https://github.com/cchayanin/codecamp-final.git
```

2. สร้าง `.env` ใน backend

```
SECRET_OR_KEY = YOUR_SECRET_KEY
PORT = PORT_FOR_EXPRESS
PASSWORD = PASSWORD_ADMIN
```

3. ติดตั้ง Dependencies ทั้งใน backend และ frontend ด้วย

```
npm install
```

4. ที่ backend ใช้คำสั่ง

```
npx sequelize init:config
```

5. แก้ไขไฟล์ `config.json` ที่อยู่ใน `./backend/config/config.json` สำหรับการเชื่อมต่อ Database จากนั้นสร้าง Schema ด้วยคำสั่ง

```
npx sequelize db:create
```

6. เริ่มต้นใช้งาน backend ด้วย

```
npm run dev
```

7. ไปที่ frontend จากนั้นใช้คำสั่ง

```
npm start
```

## Author

- [Chayanin](https://github.com/cchayanin)
