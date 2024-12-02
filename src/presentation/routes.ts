import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    // Getter
    static get routes(): Router {

        const router = Router();

        // TODO
        router.use('/api/todos', TodoRoutes.routes);

        // Clients
        // Products

        return router;
    }
}