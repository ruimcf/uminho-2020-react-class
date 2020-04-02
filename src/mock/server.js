import { Server, Model } from "miragejs";

const createMockServer = () => {
  new Server({
    models: {
      interestPoint: Model,
    },
    routes() {
      this.get("/interest-points", (db) => {
        return db.interestPoints.all();
      });

      this.post("/interest-points", (db, request) => {
        const body = JSON.parse(request.requestBody);
        const { title, latitude, longitude } = body;

        const newInterestPoint = db.interestPoints.create({ title, latitude, longitude });

        return newInterestPoint;
      });
    },
    seeds(server) {
      server.schema.interestPoints.create({
        title: "Casa da Música",
        latitude: 41.1589,
        longitude: -8.6307,
      });
      server.schema.interestPoints.create({
        title: "Torre de Belém",
        latitude: 38.6916,
        longitude: -9.216,
      });
      server.schema.interestPoints.create({
        title: "Cabo da Roca",
        latitude: 38.7804,
        longitude: -9.4989,
      });
    },
  });
};

export default createMockServer;
