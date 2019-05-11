FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
# End setup
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM microsoft/dotnet:2.2-sdk AS build
# Setup NodeJs
RUN apt-get update -qq && \
    apt-get install -qq -y wget && \
    apt-get install -qq -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_11.x | bash - && \
    apt-get install -qq -y build-essential nodejs && \
    apt-get install -qq -y nginx
# End setup
WORKDIR /src
COPY src/Web/WebSPA/WebSPA.csproj src/Web/WebSPA/
RUN dotnet restore src/Web/WebSPA/WebSPA.csproj

RUN cd src/Web/WebSPA/ClientApp \
    && npm i --silent

COPY . .
WORKDIR /src/src/Web/WebSPA
RUN dotnet build WebSPA.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish WebSPA.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WebSPA.dll"]
