import { boolean, z } from "zod";

const statusSchema = z.object({
  status: boolean(),
});

export default statusSchema;
