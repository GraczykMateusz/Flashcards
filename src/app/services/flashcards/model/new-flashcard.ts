import { BackupFlashcard } from '../../backup/backup-flashcard';

export class NewFlashcard {
  constructor(
    public content: string,
    public translation: string,
    public example: string,
    public image: string,
    public level: number,
    public owner: string
  ) {
  }

  asObject() {
    return Object.assign({}, this);
  }

  static newInstance(bf: BackupFlashcard): NewFlashcard {
    return new NewFlashcard(
      bf.content,
      bf.translation,
      bf.example,
      bf.image,
      bf.level,
      bf.owner
    );
  }
}
