import { json, Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/numeros', (request, response) => {
    const numeros = [
        21,24,30,32,49,53,54,60,
        9, 18, 21, 25, 45, 47,
        9,11,14,27,33,39,
        13, 15, 22, 33, 40, 58,
        11, 20, 34, 38, 43, 52 ,
        5, 9, 19, 39, 45,
        4, 29, 33, 44, 59,
        2, 5, 18, 23, 35, 39,
        2, 18, 23, 34, 39, 45,
        22,33,39,41,43,55,
        51, 41, 2, 14, 40, 47,
        16, 19, 45, 26, 46, 2,
        9,22,36,39,44,54
    ];

        let sorted_arr = numeros.slice().sort();

        let results: number[] = [];
        for (let i = 0; i < sorted_arr.length - 1; i++) {
          if (sorted_arr[i + 1] == sorted_arr[i]) {
            results.push(sorted_arr[i]);
          }
        }

        results = results.sort(function(a,b){
            return a - b;
        })

        console.log(results);

        let final = results.filter(function(elem, pos) {
            return results.indexOf(elem) == pos;
        });

        console.log(final);

        return response.json({'ret': final});
})

export default routes;