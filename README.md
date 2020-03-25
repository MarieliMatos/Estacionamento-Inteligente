# Estacionamento Inteligente
Um dos principais problemas de centros urbanos é o elevado número de carros particulares, isso causa ao motorista uma grande dificuldade em encontrar vagas de estacionamento mesmo em locais privados. Por isso, o objetivo deste projeto é propor uma solução que facilite a localização de vagas em estacionamentos privados, utilizando o conceito de Internet das Coisas (IoT),  onde o condutor será capaz de localizar uma vaga por meio de um aplicativo. 

### Arquitetura

A arquitetura usada para o desenvolvimento desse projeto é composta por três partes: aquisição e envio de dados para a nuvem, armazenamento e gerenciamento das informações e a interface com o usuário.

O microcontrolador é responsável por adquirir os dados de uma câmera, verificar se a vaga do estacionamento está ocupada e qual o número da placa do carro que está na vaga. Outra responsabilidade é de enviar os dados para a nuvem.

O broker será responsável por gerenciar e armazenar os dados enviados pelo microcontrolador afim de disponibilizar para o dispositivo móvel essas informações do estacionamento.

A ultima parte dessa arquitetura é o aplicativo, esse recurso informa ao usuário quais vagas estão disponíveis para estacionar  e em qual vaga o seu carro está.

### Amazon Web Services 

Para a implementação do sistema será utilizado o serviço de nuvem gerenciada fornecida pela Amazon. Essa ferramenta permite conexão bidirecional fácil e segura entre dispositivos e aplicativos a nuvem. 

O AWS fornece diversos recursos que facilitam a conexão entre dispositivos e a internet, dentre eles estão: suporte a protocolos de comunicação como o MQTT, autenticação automatizada na primeira conexão com o dispositivo e criptografia em todos os pontos de conexão. 

A plataforma também oferece serviços de banco de dados seguro e rápido, uma API que simplifica o desenvolvimento de aplicativos e contole de cadastramento e login de usuários.