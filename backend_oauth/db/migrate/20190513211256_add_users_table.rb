class AddUsersTable < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :full_name
      t.string :first_name
      t.string :image
      t.text :token
    end
  end
end
