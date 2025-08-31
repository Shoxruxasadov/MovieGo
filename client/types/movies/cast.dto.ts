import ActorDto from "../admin/actor.dto";
import LangDto from "./lang.dto";

export default interface CastDto {
  actor: ActorDto;
  role: LangDto;
}
