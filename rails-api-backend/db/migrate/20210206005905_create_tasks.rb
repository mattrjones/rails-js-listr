class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :label
      t.belongs_to :list

      t.timestamps
    end
  end
end
