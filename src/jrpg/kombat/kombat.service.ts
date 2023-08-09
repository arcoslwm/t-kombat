import { Injectable } from '@nestjs/common';
import { CreateKombatDto } from '../dto/create-kombat.dto';

@Injectable()
export class KombatService {
  //recibe data de pelea json
  //determina  de acuerdo al request que player inicia la pela.
  //crea los peleadores(?)

  //CreateKombatDto
  createKombat(createKombatDto: CreateKombatDto) {
    const { player1, player2 } = createKombatDto;
    //valida movimientos de cada player(?)
    console.debug('p1', player1);
    console.debug('p2', player2);
    //inicializa fighters
    return { player1, player2 };
  }

  //init kombat
  //   handle kombat
}
