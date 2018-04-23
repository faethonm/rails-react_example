class Appointment < ApplicationRecord
  validates_presence_of :title, :apt_time
  validates :title , length: {minimum: 3}
  validate :apt_time_cannot_be_in_the_past

  private 

  def apt_time_cannot_be_in_the_past
    if apt_time.present? && apt_time < Time.now
      errors.add(:apt_time, 'cant be in the past')
    end
  end
end
