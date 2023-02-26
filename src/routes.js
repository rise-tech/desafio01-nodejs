import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      if (title && description) {
        const task = {
          id: randomUUID(),
          title,
          description,
          completed_at: null,
          created_at: Date.now(),
          updated_at: Date.now(),
        };
        database.insert("tasks", task);
        return res.writeHead(201).end();
      } else {
        return res.writeHead(418).end("ERROR_NEED_TITLE_AND_DESCRIPTION");
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      console.log(req.params);
      const { id } = req.params;
      if (database.delete("tasks", id)) {
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end("ERROR_TASK_NOT_FOUND");
      }
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const { title, description, completed_at } = req.body;
      if (title && description) {
        if (
          database.update("tasks", id, {
            title,
            description,
            updated_at: Date.now(),
          })
        ) {
          return res.writeHead(200).end();
        } else {
          return res.writeHead(404).end("ERROR_TASK_NOT_FOUND");
        }
      } else {
        return res.writeHead(418).end("ERROR_NEED_TITLE_AND_DESCTIPTION");
      }
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      // Seleciona a task pelo id
      const [task] = database.select("tasks", { id });

      // Não entendi como funciona essa parte, principalmente o "!!"
      const isTaskCompleted = !!task.completed_at;
      const completed_at = isTaskCompleted ? null : Date.now();

      if (database.update("tasks", id, { completed_at })) {
        return res.writeHead(204).end();
      } else {
        return res.writeHead(404).end("ERROR_TASK_NOT_FOUND");
      }
    },
  },
];

// POR ALGUM MOTIVO, MESMO COM UM ID INVÁLIDO.
// SEMPRE ESTAVA RETORNANDO O 204, ACABEI FAZENDO
// DO JEITO QUE EU TINHA FEITO, POR MAIS QUE NÃO SEJA O CORRETO

//   {
//     method: "PATCH",
//     path: buildRoutePath("/tasks/:id/complete"),
//     handler: (req, res) => {
//       const { id } = req.params;

//         // Seleciona a task pelo id
//       const [task] = database.select("tasks", { id })

//         // Caso não encontre uma task com essa id, retorna 404
//       if (!task) {
//         return res.writeHead(404).end("ERROR_TASK_NOT_FOUND");
//       }

//       // Não entendi como funciona essa parte, principalmente o "!!"
//       const isTaskCompleted = !!task.completed_at
//       const completed_at = isTaskCompleted ? null : Date.now()

//       database.update('tasks', id, { completed_at })

//       return res.writeHead(204).end()
//     },
//   },
