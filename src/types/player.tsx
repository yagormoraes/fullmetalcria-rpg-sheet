import { Children } from "./children";
import { Robot } from "./robot";

export interface Player extends Children, Robot{
    name: string
    children: Children
    robot: Robot
}