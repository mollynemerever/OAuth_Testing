class UsersController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def create
    #byebug
   if User.find_by(email: user_params[:email])
     @user = User.find_by(email: user_params[:email])
     render json: @user, status: :accepted
   else
     @user = User.create(user_params)
     if @user.save
       render json: @user, status: :accepted
     else
       render json: { errors: 'Failed to create User' }, status: :unprocessible_entity
     end
   end
 end

 private

 def user_params
   params.require(:user).permit(:email, :name, :full_name, :image, :first_name)
 end


end
