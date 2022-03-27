"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({
        origin: 'https://payflipfrontend.netlify.app'
    });
    await app.listen(process.env.PORT || 3001, '0.0.0.0');
    common_1.Logger.log(`Server started running on http://localhost:${process.env.PORT}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=main.js.map