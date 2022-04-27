import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser, CognitoAccessToken, CognitoIdToken, CognitoRefreshToken, CognitoUserSession } from 'amazon-cognito-identity-js';
import { LoginDto, UserDto } from 'src/Dtos/user-dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;

  constructor(private configService: ConfigService, @InjectRepository(User) private readonly userRepo: Repository<User>) {
    this.userPool = new CognitoUserPool({ UserPoolId: configService.get('USERPOOL_ID'), ClientId: configService.get('CLIENT_ID') });
  }

  public async create(dto: UserDto): Promise<UserDto> {
    const user = await this.findUserByEmail(dto.email);

    if (user !== undefined) {
        throw new BadRequestException(`User with EMAIL: ${user.email} already exists!`);
    }

    const client = UserDto.from(dto);           // creating a dto object
    client.id = await this.register(dto);
    return await this.userRepo.save(client)
    .then(e => UserDto.fromEntity(e)); 
  }
  
  private async register(dto: UserDto): Promise<string> {
    const { username, email, user_role, given_name, family_name, password } = dto;

    var attributeList = [];

    var emailAttr = new CognitoUserAttribute({ Name: 'email', Value: email });
    var roleAttr = new CognitoUserAttribute({ Name: 'custom:user_role', Value: user_role });
    var given_nameAttr = new CognitoUserAttribute({ Name: 'given_name', Value: given_name });
    var family_nameAttr = new CognitoUserAttribute({ Name: 'family_name', Value: family_name });

    attributeList.push(emailAttr);
    attributeList.push(roleAttr);
    attributeList.push(given_nameAttr);
    attributeList.push(family_nameAttr);

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(username, password, attributeList, null, (err, result) => {
        if (!result) {
          reject(err);
        } else {
          resolve(result.userSub);
        }
      })
    })
  }

  async login(user: LoginDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password
    });
    const userData = {
      Username: name,
      Pool: this.userPool
    };

    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: ((result => {
          resolve(result);
        })),
        onFailure: ((err) => {
          reject(err);
        }),
      })
    });
  }

  findUser(id: any): Promise<User> {
    const user = this.userRepo.findOne(id);

    if (user === undefined) {
        throw new NotFoundException(`User with ID: ${id} not found!`);
    }
    return user;
  }

  public async findUserByEmail(email: string): Promise<User> {


    const user = this.userRepo.findOne({ where: {email: email }});
    if (user === undefined) {
        throw new NotFoundException(`User with EMAIL: ${email} not found!`);
    }

    return user;


 
  }

}
