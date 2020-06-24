class BinaryTree {
    // inicializa a raiz como nula
    constructor() {
        this.root = null
    }

    //exibe o menor valor da arvore
    /*Percorre toda arvore ate encontrar o valor de extrema esquerda,
    ou seja a raiz com esquerda nula sendo o menor elemento.*/
    min() {
        let current = this.root
        if (current == null)
            return null
        while (current.left != null)
            current = current.left
        return current.content
    }

    //exibe o maior valor da arvore
    /*Percorre toda arvore ate encontrar o valor de extrema direita,
    ou seja a raiz com diretia nula sendo o maior elemento.*/
    max() {
        let current = this.root
        if (current == null)
            return null
        while (current.right != null)
            current = current.right
        return current.content
    }

    //insere o elemento da arvores
    insert(element) {
        this.root = this.insertNode(this.root, element)
    }
    /*Verifica se o nó esta nulo se tiver adiciona,se não verifica 
    se ele é maior que nó e adiciona na direita e se for menor a esquerda */
    insertNode(rootNode, element) {
        if (rootNode == null)
            return new Node(element)
        if (element > rootNode.content)
            rootNode.right = this.insertNode(rootNode.right, element)
        else
            rootNode.left = this.insertNode(rootNode.left, element)
        return rootNode
    }

    //executa a função callback para cada nó, em ordem
    inOrderTraverse(callback) {
        this.inOrderVisitor(this.root, callback)
    }
    /*Percorre toda a arvore e mostra na esquencia de ordem no caso 
     esquerda,raiz e direita */
    inOrderVisitor(node, callback) {
        if (node == null)
            return
        this.inOrderVisitor(node.left, callback)
        callback(node.content)
        this.inOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pré-ordem
    preOrderTraverse(callback) {
        this.preOrderVisitor(this.root, callback)
    }
   /*Percorre toda a arvore e mostra na esquencia de pré-ordem no caso 
     raiz,esquerda e direita */
    preOrderVisitor(node, callback) {
        if (node == null)
            return
        callback(node.content)
        this.preOrderVisitor(node.left, callback)
        this.preOrderVisitor(node.right, callback)
    }

    //executa a função callback para cada nó, em pós-ordem
    postOrderTraverse(callback) {
        this.postOrderVisitor(this.root, callback)
    }
   /*Percorre toda a arvore e mostra na esquencia de  pós-ordem no caso 
     esquerda,direita e raiz*/
    postOrderVisitor(node, callback) {
        if (node == null)
            return
        this.postOrderVisitor(node.left, callback)
        this.postOrderVisitor(node.right, callback)
        callback(node.content)
    }

    //retorna true se o valor já existe na arvore 
    //     Busca na árvore binária
    //    1. É nulo? o elemento não existe
    //    2. É igual ao conteúdo? achou
    //    3. É maior que o conteúdo?
    //       3.1 busca de direita
    //       3.2 busca na esquerda
    
    //Apenas retorna o valor de encontrado em search Visitor.
    search(value) {
        return this.searchVisitor(this.root, value)
    }
   /*O primeiro if verifica se a árvore tá vazia.
     O segundo verifica se o elemento é igual a raiz. 
     O terceiro testa se o node for maior que element ele vai procurar direita se for
      menor ele procura na esquerda.*/
    searchVisitor(node, element) {
        if (node == null)
            return false
        if (node.content == element)
            return true;
        if (element > node.content)
            return this.searchVisitor(node.right, element)
        else
            return this.searchVisitor(node.left, element)
    }

    //remove um elemento existente na arvore o retorna
    //Retorna a nova arvore atualizada em removeVisitor
    remove(value) {
        this.root = this.removeVisitor(this.root, value)
    }
    /*Os dois primeiros if é para remoção onde os nos da dirita e esquerda 
    são vazios retornando valor nulo. O primeiro else if caso só tenha valor 
    no esquerdo retorna o mesmo o segundo else if é quando tem-se apenas valor 
    na direita e retorna o mesmo. O else é caso seja a raiz a ser removida faz-se
    o maior valor vira a raiz,procura-se a extrema esquerda na antiga sub arvore direita 
     e adiciona a arover esquerda neste local  */
    removeVisitor(node, value) {
        if (node.content == value) {
            if (node.left == node.right) {
                //nao tem filhos - Grau 0
                return null
            } else if (node.right == null) {
                //não tem filhos na direita, e tem nó na esqueda - Grau 1
                return node.left
            } else if (node.left == null) {
                //não tem filhos da esquerda, e tem nó da direita - Grau 1
                return node.right
            } else {
                // tem os dois ramos - Grau 2
                const newRoot = node.right
                let current = node.right;
                while (current.left != null)
                    current = current.left
                current.left = node.left
                return newRoot;
            }
            //Aqui a remoção do value for menor é na esquerda se não é na direita e pós feita ele a retorna.
        } else if (value < node.content) {
            node.left = this.removeVisitor(node.left, value)
        } else {
            node.right = this.removeVisitor(node.right, value)
        }
        return node;
    }

    //exibe a altura da arvore
    //Faz a chamada do medoto HightVisitor e poem para comeeçar da raiz.
    height() {
        return this.heightVisitor(this.root)
    }
    /* Verfica se esta nulo se tiver retorna -1,Caso não seja procura altura da 
       arvore da esquerda e da direita depois verifica qual a mair usando uma função math 
       retorna o valor maior somado com 1 */
    heightVisitor(node) {
        if (!node)
            return -1
        let leftHeight = this.heightVisitor(node.left),
            rightHeight = this.heightVisitor(node.right)
        return Math.max(leftHeight, rightHeight) + 1
    }

    // informa quantos nós existem na arvore
    //retorna o resultado de sizeVisitor e poem para inciar da raiz
    size() {
        return this.sizeVisitor(this.root)
    }
    /*verifica se esta vazia a arvore se tive retorna 0 se nao tiver conta a os nos das direita e esquerda
    e depois soma os dois e com mais um*/ 
    sizeVisitor(node) {
        if (!node)
            return 0
        return this.sizeVisitor(node.left) + this.sizeVisitor(node.right) + 1
    }
}