export class GameElement {
  constructor(type) {
    this.type = type;
  }
}

export class GameBoard {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = this.createBoard();
  }

  createBoard() {
    const symbols = ["♠️", "♣️", "♥️", "♦️"];
    const board = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        const randomType = symbols[Math.floor(Math.random() * symbols.length)];
        const element = new GameElement(randomType);
        row.push(element);
      }
      board.push(row);
    }
    return board;
  }

  printBoard() {
    for (let i = 0; i < this.rows; i++) {
      console.log(
        this.board[i].map((element) => element?.type || "null").join(" ")
      );
    }
  }

  findAndRemoveGroup(row, col) {
    const elementType = this.board[row][col]?.type;

    if (!elementType) {
      return;
    }

    const visited = Array.from({ length: this.rows }, () =>
      Array(this.cols).fill(false)
    );

    const dfs = (r, c) => {
      if (
        r < 0 ||
        r >= this.rows ||
        c < 0 ||
        c >= this.cols ||
        visited[r][c] ||
        this.board[r][c]?.type !== elementType
      ) {
        return;
      }

      visited[r][c] = true;
      this.board[r][c] = null;

      dfs(r - 1, c); // Вгору
      dfs(r + 1, c); // Вниз
      dfs(r, c - 1); // Вліво
      dfs(r, c + 1); // Вправо
    };

    dfs(row, col);
  }

  hasMatchingGroups() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.board[i][j] && this.isValidMove(i, j)) {
          return true;
        }
      }
    }
    return false;
  }

  isValidMove(row, col) {
    if (!this.board[row][col]) {
      if (
        (row - 1 >= 0 &&
          this.board[row - 1][col]?.type === this.board[row - 2][col]?.type) ||
        (col - 1 >= 0 &&
          this.board[row][col - 1]?.type === this.board[row][col - 2]?.type)
      ) {
        return true;
      }
    }
    return false;
  }
}
