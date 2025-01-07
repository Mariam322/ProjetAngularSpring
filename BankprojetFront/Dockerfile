FROM node:16

RUN npm install -g @angular/cli 


RUN npm cache clean --force && npm install

COPY . .

EXPOSE 4200

CMD ng serve
