# Estacionamento Inteligente
  Um dos principais problemas de centros urbanos é o elevado número de carros particulares, isso causa ao motorista uma grande dificuldade em encontrar vagas de estacionamento mesmo em locais privados. Por isso, o objetivo deste projeto é propor uma solução que facilite a localização de vagas em estacionamentos privados, utilizando o conceito de Internet das Coisas (IoT),  onde o condutor será capaz de localizar uma vaga por meio de um aplicativo. 

1. [Arquitetura](#arquitetura)
2. [Camada de percepção](#camada-de-percepção)   
3. [Camada de Rede](#camada-de-rede)  
        1. [MQTT](#mqtt) <br/> 
        2. [AWS IoT Core](#aws-iot-core) <br/> 
4. [Camada de processamento](#camada-de-processamento)
5. [Camada de aplicação](#camada-de-aplicação) <br/> 
        1. [Identificação de usuários](#identificação-de-usuários)
6. [Referências](#referências)
## Arquitetura

  Para desenvolver esse projeto, foi escolhido a arquitetura de cinco camadas, que atualmente é um dos modelos mais utilizados na área de IoT (MASHAL et al., 2015). Essa estrutura é composta pelas camadas:
* Percepção: também chamada de camada de dispositivo, é responsável pela identificação de objetos e aquisição de dados.
* Rede: sua função é estabelecer a comunicação entre a camada de percepção com a camada de processamento de forma segura e confiável.
* Processamento: encarregada de armazenar, analisar e processar as informações já obtidas.
* Aplicação: permite a interação entre o usuário e a camada de dispositivo.
* Negócio: essa camada é responsável por gerir os serviços implementados e com os dados recebidos da camada de aplicação construir um modelo de negócios.

  Tendo em vista essa arquitetura aplicada ao projeto, a camada de percepção terá como sensor uma câmera, dessa forma será possível decidir se a vaga está disponível ou qual o carro que está a ocupando. Para conexão entre a camada de dispositivo e de processamento, haverá um microcontrolador para adquirir os dados desse sensor e enviá-los via o protocolo MQTT para essa camada. Com esses dados, a camada de processamento será encarregada de armazenar e disponibilizar as informação para a camada da aplicação de interface com o usuário, a figura 1 mostra o diagrama do sistema.

<div align="center"> Figura 1 - Arquitetura do Projeto</div>
<p align="center">
  <img src="figuras/Arquitetura.png">
</p>

## Camada de percepção

O reconhecimento de placas foi realizado utilizando a linguagem de programação Python, com o auxílio da biblioteca de visão computacional e aprendizado de máquina OpenCV (Open Source Computer Vision Library).

A primeira etapa foi converter a imagem em tons de cinza e em seguida retirar os ruídos da imagem, para isso foi utilizado um algoritmo que borra a imagem. Essa função faz a média dos pixels sob a área de um kernel e substitui o elemento central por esse valor. 

<div align="center"> Figura 2 - Figura Borrada</div>
<p align="center">
  <img src="figuras/blur.png" width=400>
</p>

O próximo passo foi detectar as bordas da imagem, a forma feita neste trabalho foi detectar uma mudança brusca de de intensidade de um pixel, por meio da derivada, utilizando o filtro Sobel.

O filtro de Sobel é um operador de diferenciação, que faz uma aproximação ponto à ponto do gradiente da intensidade dos pixels da imagem. Esse algoritmo é capaz de determinar uma variação de claro para escuro e a taxa de alteração em uma determinada direção (eixo x ou y). Dessa forma, as letras da placa foram detectadas.

<div align="center"> Figura 2 - Filtro de Sobel</div>
<p align="center">
  <img src="figuras/sobel.png" width=400>
</p>

Com as letras detectadas foi realizada a binarização da imagem, para realçar a área de interesse. A última etapa foi interligar as letras da placa e formar um retângulo em volta. Para isso foi criado uma estrutura morfológica específica que melhor se encaixou neste caso.

<div align="center"> Figura 5 - Binarização e Estrutura morfológica </div>
<p align="center">
  <img src="figuras/binarização.png" width="250" />
  <img src="figuras/rect.png" width="240" /> 
</p>


Em seguida foi detectado os contornos de forma retangular imagem, e dentre os retângulos foi determinado o retângulo que tem a área da placa. E por fim, foi realizado o corte da imagem na região retangular.

<div align="center"> Figura 2 - Política de dispositivos conectados </div>
<p align="center">
  <img src="figuras/crop.png" width=400>
</p>

Para determinar os caracteres da placa foi utilizado a ferramenta Tessaract, disponibilizada pelo Google para o reconhecimento óptico de caracteres (OCR). Então com uma função que detecta caracteres em uma imagem, o número da placa foi detectado.


## Camada de Rede

A camada de rede é responsável pela conexão entre o sensor e a camada de gerenciamento de informações, então, essa camada precisa oferecer um serviço confiável de transmissão de dados.  Para isso, o protocolo de comunicação escolhido foi o MQTT junto com o microcontrolador ESP32 para o envio de dados para o servidor da AWS, o IoT Core.

### MQTT <a name="mqtt"></a>
O MQTT (*Message Queue Telemetry Transport*) é um protocolo leve que utiliza baixa largura de rede, baseado em TCP/IP. Utiliza o paradigma de publicação e assinatura (*publish/Subscribe*) em um tópico de um servidor para gerenciar o fluxo de dados. 

Nesse padrão, quando um cliente deseja receber uma determinada informação, ele se subscreve em um tópico por meio de uma requisição para um servidor (também conhecido como *broker*), que oferece o serviço de intermediador nesse processo. Serviços que desejam enviar os dados também devem se inscrever nesse tópico. (YUAN, 2017).

### AWS IoT Core <a name="aws-iot-core"></a>

O AWS IoT Core é um serviço de nuvem gerenciada que permite a conexão fácil e segura de dispositivos e aplicativos à Internet. Para estabelecer a segurança no envio e recebimento de mensagens, este serviço oferece autenticação e criptografia mútua nos pontos de conexão, dessa forma, dispositivos e o Core não trocam mensagem sem uma identidade comprovada. 

Os dispositivos que comunicam-se com o protocolo MQTT utilizam o método de segurança baseado em certificado, que usa o protocolo TLS. Assim, quando um dispositivo tenta se conectar a plataforma, o AWS IoT Core solicita um certificado de cliente e valida o status do certificado, em seguida, solicita a chave privada que corresponde a chave publica que está no certificado.
	
Para haver transferência de dados, além de possuir o certificado, o dispositivo (também chamado de coisa) também precisa estar autorizado a promover a leitura ou escrita em um tópico. Por isso é preciso configurar as politicas de acesso a ‘coisa’, dessa maneira, o usuário tem pleno controle dos acessos aos tópicos do Core.

No projeto, o envio de dados é feito apenas pelo microcontrolador, então foi preciso criar uma coisa (*thing*) que represente este dispositivo na plataforma. Em seguida, criou-se um certificado de autenticação e associar a coisa. Por fim, a politica de autorização foi criada (figura 2), que nesse caso apenas de publicação no tópico da aplicação.

<div align="center"> Figura 2 - Política de dispositivos conectados </div>
<p align="center">
  <img src="figuras/policy.png">
</p>


 ## Camada de processamento
 
 Para armazenar os dados obtidos dos sensores, foi utilizado a plataforma de banco de dados da Amazon, o DynamoDB. Essa tecnologia é um serviço de banco de dados NoSQL (não relacional), com o tipo de armazenamento de chave-valor.

Os componentes do DynamoDB podem ser divididos em três: tabelas, itens e atributos. As tabelas são referentes a todos dados armazenados, os itens são os grupos de atributos que possuem identificação própria, e os atributos são elementos de dados fundamentais aos itens.

Ao criar uma nova tabela, além de seu nome é preciso especificar a chave primária, ou seja um identificador exclusivo para cada item. Isso pode ser feito de duas formas, com a chave de partição utilizado quando existe apenas uma chave primária, ou a chave primária composta, para quando há múltiplos itens com a mesma chave. 

A chave de partição é composta por apenas um atributo e a utiliza para a chamada da função hash. Já a chave primária composta, contém a chave de partição, que também chama a função hash, e a chave de classificação arranja os dados com a mesma chave primária de forma ordenada.

Para associar a camada de rede com a camada de processamento, foi estabelecido uma regra no AWS IoT Core que ao receber uma mensagem no tópico do estacionamento a informação era salva no banco de dados “Estacionamento”. 

A tabela criada para esse projeto foi estabelecida com a chave de partição, sendo a chave primária o número da vaga, e com os atributos de status, para verificar se a vaga está ocupada e número da placa do carro. Quando não houver carro na vaga, este ultimo atributo estará como nulo, a figura 3 mostra uma pré-visualização da tabela.
 
<div align="center"> Figura 3 - Tabela do banco de dados </div>
<p align="center">
  <img src="figuras/tableDB.png">
</p>

Para disponibilizar os dados a aplicação, utilizou-se uma interface de programação de aplicativos (API). Uma API é um conjunto de definições e protocolos usado para o desenvolvimento e integração de aplicações. A principal vantagem do uso dessa ferramenta é a possibilidade de integração entre serviços totalmente diferentes de maneira simples.  (HAT, 2020)

Uma API utiliza requisições HTTP, que são responsáveis pelas operações essenciais para manipulações de dados. Dentre as requisições existentes, utilizada neste trabalho foi a get, responsável por solicitar informações de um determinado recurso para a aplicação. 

O serviço de API utilizado para esse projeto é o API Getway oferecido pela AWS. Essa ferramenta oferece o gerenciamento de APIs, onde é possível criar, publicar, manter e monitorar com facilidade. Porém, para estabelecer o conexão entre o  banco de dados e a API, foi preciso criar uma função Lambda que é acionada toda vez que é feito uma requisição HTTP a função é responsável por ler o banco de dados e retornar com os valores.

 ## Camada de aplicação
 
 Para o desenvolvimento da aplicação móvel foi utilizado o *framework* React Native. Essa ferramenta é *open-source*, escrito em Javascript e criado pelo Facebook para desenvolver aplicações IOS e Android de forma nativa. Esse framework é capaz de traduzir o código escrito em Javascript, HTML e CSS em elementos nativos para cada sistema operacional, o que diminui o tempo de produção de um produto, sem diminuir o desempenho do sistema. (EISENMAN, 2015)

 Para consumir a API criada no API Getway, foi utilizado a biblioteca Axios, que é um cliente HTTP, baseado em promessas, para enviar as requisições à API. Nessa aplicação é realizada uma requisição do tipo *“get”* que retorna os estados das vagas. 

 ### Aplicativo

 O aplicativo possui duas telas, a primeira tela mostra um estacionamento com a vista superior onde todas as vagas aparecem, já a segunda tela é exibida quando o usuário apertar o botão de busca no canto inferior direito da tela inical. 

<div align="center"> Figura 4 - Telas do aplicativo </div>
<p align="center">
  <img src="figuras/tela1.png" width="250" />
  <img src="figuras/tela2.png" width="250" /> 
</p>

A tela de busca tem uma caixa de texto onde o usuário poderá inserir a placa do seu carro. Se a placa estiver registrada no banco de dados, o aplicativo retornará à tela inicial com um destaque na vaga ocupada, senão, irá aparecer um aviso de veículo não encontrado.
 
 <div align="center"> Figura 5 - Respsta à busca do usuário </div>
<p align="center">
  <img src="figuras/tela4.png" width="250"/>
  <img src="figuras/tela3.png" width="250" /> 
</p>



 ## Referências

AWS. Amazon API Gateway. Disponível em: https://aws.amazon.com/pt/api-gateway/. Acesso em: 11 out. 2020.

AMAZON. Amazon DynamoDB: developer guide. Disponível em: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/dynamodb-dg.pdf. Acesso em: 06 abr. 2020.

AMAZON. AWS IoT: developer guide. Disponível em: https://docs.aws.amazon.com/iot/latest/developerguide/iot-dg.pdf. Acesso em: 06 abr. 2020.

EISENMAN, Bonnie. What Is React Native? 2015. Disponível em: https://www.oreilly.com/library/view/learning-react-native/9781491929049/ch01.html. Acesso em: 11 out. 20

HAT, Red. O que é API? Disponível em: https://www.redhat.com/pt-br/topics/api/what-are-application-programming-interfaces. Acesso em: 11 out. 2020.

MASHAL, Ibrahim et al. Choices for interaction with things on Internet and underlying issues. Ad Hoc Networks. Online, p. 68-90. maio 2015. Disponível em: https://www.sciencedirect.com/science/article/abs/pii/S1570870514003138?via%3Dihub. Acesso em: 03 abr. 2020.
	
YUAN, Michael. Conhecendo o MQTT: por que o mqtt é um dos melhores protocolos de rede para a internet das coisas?. Por que o MQTT é um dos melhores protocolos de rede para a Internet das Coisas?. 2017. Disponível em: https://www.ibm.com/developerworks/br/library/iot-mqtt-why-good-for-iot/index.html. Acesso em: 03 abr. 2020.
	
