import cors from "cors";

const plugins=(app,express) => {
    app.use(express.json());
    app.use(cors());
}

export default plugins;