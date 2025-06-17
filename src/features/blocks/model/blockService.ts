import { Block, BlockType } from '../types/block';

/**
 * Сервис для работы с блоками страницы
 * Управляет состоянием блоков, историей изменений и операциями undo/redo
 */
export class BlockService {
  private blocks: Block[] = [];
  private history: Block[][] = [];
  private historyIndex: number = -1;

  /**
   * Добавляет новый блок в конец страницы
   * @param type - Тип блока (текст, изображение и т.д.)
   * @param content - Начальное содержимое блока
   * @returns ID созданного блока
   */
  addBlock(type: BlockType, content: any): string {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      type,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.saveToHistory();
    this.blocks.push(newBlock);
    return newBlock.id;
  }

  /**
   * Обновляет содержимое блока
   * @param id - ID блока
   * @param content - Новое содержимое
   * @throws Error если блок не найден
   */
  updateBlock(id: string, content: any): void {
    const block = this.blocks.find(b => b.id === id);
    if (!block) {
      throw new Error(`Block ${id} not found`);
    }

    this.saveToHistory();
    block.content = content;
    block.updatedAt = new Date();
  }

  /**
   * Удаляет блок по ID
   * @param id - ID блока
   * @throws Error если блок не найден
   */
  deleteBlock(id: string): void {
    const index = this.blocks.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error(`Block ${id} not found`);
    }

    this.saveToHistory();
    this.blocks.splice(index, 1);
  }

  /**
   * Перемещает блок на новую позицию
   * @param id - ID блока
   * @param newIndex - Новая позиция
   * @throws Error если блок не найден или индекс невалидный
   */
  moveBlock(id: string, newIndex: number): void {
    const currentIndex = this.blocks.findIndex(b => b.id === id);
    if (currentIndex === -1) {
      throw new Error(`Block ${id} not found`);
    }
    if (newIndex < 0 || newIndex >= this.blocks.length) {
      throw new Error('Invalid index');
    }

    this.saveToHistory();
    const [block] = this.blocks.splice(currentIndex, 1);
    this.blocks.splice(newIndex, 0, block);
  }

  /**
   * Отменяет последнее изменение
   * @returns true если отмена успешна, false если нечего отменять
   */
  undo(): boolean {
    if (this.historyIndex <= 0) {
      return false;
    }

    this.historyIndex--;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
    return true;
  }

  /**
   * Повторяет отмененное изменение
   * @returns true если повтор успешен, false если нечего повторять
   */
  redo(): boolean {
    if (this.historyIndex >= this.history.length - 1) {
      return false;
    }

    this.historyIndex++;
    this.blocks = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
    return true;
  }

  /**
   * Сохраняет текущее состояние в историю
   * Удаляет все состояния после текущего индекса
   */
  private saveToHistory(): void {
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(JSON.parse(JSON.stringify(this.blocks)));
    this.historyIndex = this.history.length - 1;
  }

  /**
   * Возвращает все блоки
   */
  getBlocks(): Block[] {
    return this.blocks;
  }

  /**
   * Возвращает блок по ID
   * @param id - ID блока
   * @throws Error если блок не найден
   */
  getBlock(id: string): Block {
    const block = this.blocks.find(b => b.id === id);
    if (!block) {
      throw new Error(`Block ${id} not found`);
    }
    return block;
  }
} 