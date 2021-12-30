import { Injectable } from '@nestjs/common';
import { CognitoUserPool, CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { LoginDto, UserDto } from 'src/Dtos/user-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({ UserPoolId: configService.get('USERPOOL_ID'), ClientId: configService.get('CLIENT_ID') });
  }
  
  async register(registerUserRequest: UserDto): Promise<string> {
    const { name, email, given_name, family_name, password } = registerUserRequest;

    var attributeList = [];

    var emailAttr = new CognitoUserAttribute({ Name: 'email', Value: email });
    var given_nameAttr = new CognitoUserAttribute({ Name: 'given_name', Value: given_name });
    var family_nameAttr = new CognitoUserAttribute({ Name: 'family_name', Value: family_name });

    attributeList.push(emailAttr);
    attributeList.push(given_nameAttr);
    attributeList.push(family_nameAttr);

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(name, password, attributeList, null, (err, result) => {
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
}
