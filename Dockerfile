FROM node:onbuild

# Install Grunt
RUN npm install -g grunt-cli
RUN grunt test

# Define default command.
CMD true