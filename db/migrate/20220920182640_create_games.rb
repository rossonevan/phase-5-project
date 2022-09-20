class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :title
      t.string :short_description
      t.string :genre
      t.string :platform
      t.string :publisher
      t.string :developer
      t.string :release_date
      t.string :thumbnail

      t.timestamps
    end
  end
end
