# PSCORD

## 설치 방법

### nodejs 설치
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm install 12
```

### 패키지 설치
```
npm install --global yarn
yarn install
```

### 설정 파일 작성
> BOT_TOKEN - 봇 토큰
>
> COMMAND_PREFIX - 명령어 접두사
>
> HOST - 웹사이트 호스트
>
> PORT - 웹사이트 포트
>
> SESSION_KEY = 웹사이트 세션 시크릿
>
> OAUTH2_CLIENT_ID - 디스코드 클라이언트 ID
>
> OAUTH2_CLIENT_SECRET - 디스코드 클라이언트 시크릿
>
> OAUTH_REDIRECT_URI - 디스코드 OAUTH2 리다이렉트 URI

### 봇 실행

```
프로덕션 - yarn start
개발 - yarn dev
```
